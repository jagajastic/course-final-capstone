import { useRef, useEffect } from 'react'


/**
 * 3. Implement this function to transform the raw data
 * retrieved by the getMenuItems() function inside the database.js file
 * into the data structure a SectionList component expects as its "sections" prop.
 * @see https://reactnative.dev/docs/sectionlist as a reference
 */
export function getSectionListData(input) {
  // SECTION_LIST_MOCK_DATA is an example of the data structure you need to return from this function.
  // The title of each section should be the category.
  // The data property should contain an array of menu items.
  // Each item has the following properties: "id", "title" and "price"
  const output = {}

  // Loop over each item in the input array
  input.forEach((item) => {
    // Get the category of the item
    const category = item.category

    // If this is the first item we've seen for this category, create an entry in the output object
    if (!output[category]) {
      output[category] = {
        category: category,
        data: [],
      }
    }

    // Add the current item to the data array for the category
    output[category].data.push({
      id: item.id,
      title: item.title,
      price: item.price,
    })
  })

  // Convert the output object to an array and return it
  return Object.values(output)
}

export function useUpdateEffect(effect, dependencies = []) {
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      return effect()
    }
  }, dependencies)
}
