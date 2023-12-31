export const Loader = () => {
  return (
    <svg viewBox="0 0 64 16" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <circle fill="white" stroke="none" cx="8" cy="8" r="8">
        <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1"></animate>
      </circle>
      <circle fill="white" stroke="none" cx="32" cy="8" r="8">
        <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2"></animate>
      </circle>
      <circle fill="white" stroke="none" cx="56" cy="8" r="8">
        <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3"></animate>
      </circle>
    </svg>
  )
}
