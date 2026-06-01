export const formatDate = (date: string) => {
  if (!date) {
    return '정보 없음'
  }

  return date.replaceAll('-', '.')
}

export const formatRuntime = (runtime: number | null) => {
  if (!runtime) {
    return '정보 없음'
  }

  const hours = Math.floor(runtime / 60)
  const minutes = runtime % 60

  if (hours === 0) {
    return `${minutes}분`
  }

  return `${hours}시간 ${minutes}분`
}

export const formatMoney = (amount: number) => {
  if (amount === 0) {
    return '정보 없음'
  }

  return `US$${amount.toLocaleString('en-US')}`
}

export const formatRating = (rating: number) => rating.toFixed(1)
