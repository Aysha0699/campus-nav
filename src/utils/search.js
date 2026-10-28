// Returns the records that match what the user typed.
// Every word typed must appear somewhere in the record.
export function searchRecords(records, query) {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean)

  if (words.length === 0) return []

  return records.filter((record) => {
    const text = [
      record.title,
      record.code,
      record.category,
      record.kind,
      record.buildingName,
      ...record.aliases,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return words.every((word) => text.includes(word))
  })
}