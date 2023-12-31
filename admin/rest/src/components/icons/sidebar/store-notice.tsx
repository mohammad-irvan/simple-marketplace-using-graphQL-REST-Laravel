export const StoreNoticeIcon: React.FC<React.SVGAttributes<{}>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <path
      fill="currentColor"
      d="M17.5 15a1.875 1.875 0 0 1-1.875 1.875h-8.75A1.875 1.875 0 0 0 8.75 15c0-.781-.625-1.25-.625-1.25h8.75s.625.469.625 1.25Z"
      opacity={0.2}
    />
    <path
      fill="currentColor"
      d="M7.5 8.125a.625.625 0 0 1 .625-.625h5a.625.625 0 1 1 0 1.25h-5a.625.625 0 0 1-.625-.625Zm.625 3.125h5a.624.624 0 1 0 0-1.25h-5a.625.625 0 1 0 0 1.25Zm10 3.75a2.5 2.5 0 0 1-2.5 2.5h-8.75a2.5 2.5 0 0 1-2.5-2.5V5a1.25 1.25 0 0 0-2.5 0c0 .448.377.752.381.755a.625.625 0 0 1-.755.994C1.41 6.683.625 6.063.625 5a2.5 2.5 0 0 1 2.5-2.5H13.75a2.5 2.5 0 0 1 2.5 2.5v8.125h.625c.135 0 .267.044.375.125.094.067.875.687.875 1.75ZM7.52 13.553a.63.63 0 0 1 .605-.428H15V5a1.25 1.25 0 0 0-1.25-1.25H5.288c.221.38.338.81.337 1.25v10a1.25 1.25 0 0 0 2.5 0c0-.448-.377-.752-.381-.755a.611.611 0 0 1-.224-.692ZM16.875 15a.983.983 0 0 0-.252-.625H9.279c.063.202.095.413.094.625.001.439-.115.87-.335 1.25h6.587a1.25 1.25 0 0 0 1.25-1.25Z"
    />
  </svg>
);


export const StoreNoticeOwnerIcon: React.FC<React.SVGAttributes<{}>> = (props) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        opacity={0.2}
        d="M17.5 10a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
        fill="currentColor"
      />
      <path
        d="M11.25 13.75a.624.624 0 01-.625.625 1.25 1.25 0 01-1.25-1.25V10a.625.625 0 010-1.25 1.25 1.25 0 011.25 1.25v3.125a.624.624 0 01.625.625zM18.125 10A8.125 8.125 0 1110 1.875 8.133 8.133 0 0118.125 10zm-1.25 0A6.875 6.875 0 1010 16.875 6.883 6.883 0 0016.875 10zM9.687 7.5a.938.938 0 100-1.875.938.938 0 000 1.875z"
        fill="currentColor"
      />
    </svg>
  );
}