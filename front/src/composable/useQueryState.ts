/**
 * @file A composable to manage queries fetching.
 */
import { reactive } from 'vue'

const queriesFetched = reactive(new Map<string, boolean>())

/**
 * Check if a query is fetched and if not it is registered in an array.
 */
export const useQueryState = () => {
  /**
   * Check if the query is already fetched.
   */
  const isQueryFetched = async (queryNames: string | Array<string>, callback: () => void) => {
    const array = typeof queryNames === 'string' ? [queryNames] : [...queryNames]

    // Check if any of the queries is not fetched
    const queriesToFetch = array.filter((queryName) => !queriesFetched.has(queryName))

    // If there are queries to fetch, execute the callback and mark them as fetched
    if (queriesToFetch.length > 0) {
      queriesToFetch.forEach((queryName) => {
        queriesFetched.set(queryName, true)
      })

      // Call the callback once after all queries are marked as fetched
      await callback()
    }
  }

  /**
   * Delete queries.
   */
  const clearSavedQueries = () => {
    queriesFetched.clear()
  }

  return { isQueryFetched, clearSavedQueries }
}
