export const tableStyles = {
  header: {
    base: "sticky top-0 z-30 border-b border-gray-200",
    testCase: "sticky left-0 z-40 bg-white px-6 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap border-r border-gray-200",
    group: {
      base: "px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-wider whitespace-nowrap border-r border-gray-200",
      conditions: "bg-orange-50/90 text-orange-900",
      measurement: "bg-blue-50/90 text-blue-900",
    }
  },
  subHeader: {
    base: "border-b border-gray-200 bg-white",
    testCase: "sticky left-0 z-30 bg-white px-6 py-3 border-r border-gray-200",
    column: {
      base: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap",
      conditions: "bg-orange-50/50 text-orange-800 border-r border-orange-200/50",
      measurement: "bg-blue-50/50 text-blue-800 border-r border-blue-200/50",
    }
  }
};