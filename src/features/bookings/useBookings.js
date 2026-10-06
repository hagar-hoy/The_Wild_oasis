import { noop, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { Page_Size } from "../../ui/Pagination";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  //filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  //sorted
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };
  //pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const { isLoading, data, error } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });
  const bookings = data?.data;
  const count = data?.count;

  //Pre-Fetch
  const pageCount = Math.ceil(count / Page_Size);
  if (page < pageCount)
    queryClient
      .query({
        queryKey: ["bookings", filter, sortBy, page + 1],
        queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
      })
      .catch(() => {});

  if (page > 1)
    queryClient
      .query({
        queryKey: ["bookings", filter, sortBy, page - 1],
        queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
      })
      .catch(noop);
  return { isLoading, error, bookings, count };
}
