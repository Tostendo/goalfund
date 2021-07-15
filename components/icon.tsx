import React from "react";

type IconProps = {
  type: string;
  size?: string;
};

const Icon = ({ type }: IconProps) => {
  switch (type) {
    case "pencil":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="h-full w-full"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      );
    case "menu":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="h-full w-full"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      );
    case "logout":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-full w-full"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      );
    case "checkmark":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-full w-full"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      );
    case "delete":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-full w-full"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      );
    case "facebook":
      return (
        <svg
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
          className="h-full w-full"
        >
          <g fillRule="nonzero">
            <path
              d="M512 256C512 114.62 397.39 0 256 0 114.62 0 0 114.61 0 256c0 127.78 93.62 233.69 216 252.89V330h-65v-74h65v-56.4c0-64.16 38.22-99.6 96.7-99.6 28 0 57.3 5 57.3 5v63h-32.28c-31.8 0-41.72 19.73-41.72 39.98V256h71l-11.35 74H296v178.89C418.39 489.69 512 383.78 512 256z"
              fill="#1877f2"
            />
            <path
              d="M355.65 330L367 256h-71v-48.02c0-20.25 9.92-39.98 41.72-39.98H370v-63s-29.3-5-57.3-5c-58.48 0-96.7 35.44-96.7 99.6V256h-65v74h65v178.89a257.91 257.91 0 0080 0V330h59.65z"
              fill="#fff"
            />
          </g>
        </svg>
      );
    case "twitter":
      return (
        <svg
          viewBox="0 0 512 512"
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
        >
          <path fill="none" d="M56 56h400v400H56z" />
          <path
            d="M161.01 464.01c193.21 0 298.89-160.07 298.89-298.88 0-4.55 0-9.07-.3-13.58A213.74 213.74 0 00512 97.18a209.7 209.7 0 01-60.33 16.52 105.43 105.43 0 0046.18-58.1 210.55 210.55 0 01-66.7 25.5 105.18 105.18 0 00-76.6-33.11c-57.68 0-105.14 47.46-105.14 105.14 0 8 .91 15.98 2.72 23.77A298.37 298.37 0 0135.63 67.15C7.91 114.88 22.26 176.73 68.16 207.38c-16.72-.5-33.07-5-47.68-13.15v1.33c.01 49.81 35.45 93.11 84.27 102.97a104.9 104.9 0 01-47.43 1.8 105.38 105.38 0 0098.14 72.96A210.83 210.83 0 010 416.83a297.42 297.42 0 00161.01 47.1"
            fill="#1da1f2"
            fillRule="nonzero"
          />
        </svg>
      );
    case "instagram":
      return (
        <svg
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          className="h-full w-full"
          strokeLinejoin="round"
          strokeMiterlimit="2"
        >
          <g fillRule="nonzero">
            <path
              d="M256 0c-69.53 0-78.24.3-105.55 1.54-27.25 1.24-45.86 5.57-62.14 11.9-16.84 6.54-31.11 15.3-45.34 29.53C28.74 57.2 19.98 71.47 13.44 88.3c-6.33 16.28-10.66 34.9-11.9 62.14C.29 177.75 0 186.47 0 256c0 69.52.3 78.24 1.54 105.55 1.24 27.25 5.57 45.86 11.9 62.14 6.54 16.83 15.3 31.1 29.53 45.34 14.23 14.23 28.5 22.99 45.34 29.53 16.28 6.33 34.9 10.66 62.14 11.9C177.75 511.7 186.47 512 256 512c69.52 0 78.24-.3 105.55-1.54 27.25-1.24 45.86-5.57 62.14-11.9 16.83-6.54 31.1-15.3 45.34-29.53 14.23-14.23 22.99-28.5 29.53-45.34 6.33-16.28 10.66-34.9 11.9-62.14C511.7 334.25 512 325.52 512 256c0-69.53-.3-78.24-1.54-105.55-1.24-27.25-5.57-45.86-11.9-62.14-6.54-16.83-15.3-31.11-29.53-45.34-14.23-14.23-28.5-22.99-45.34-29.53-16.28-6.33-34.9-10.66-62.14-11.9C334.25.3 325.52 0 256 0zm0 46.13c68.35 0 76.45.26 103.44 1.49 24.96 1.14 38.52 5.3 47.54 8.81 11.95 4.65 20.48 10.2 29.43 19.15 8.96 8.96 14.51 17.49 19.15 29.44 3.51 9.02 7.68 22.57 8.82 47.53 1.23 27 1.5 35.1 1.5 103.45s-.27 76.45-1.5 103.44c-1.14 24.96-5.3 38.52-8.81 47.54-4.65 11.95-10.2 20.48-19.15 29.43-8.96 8.96-17.5 14.51-29.44 19.15-9.02 3.51-22.58 7.68-47.53 8.82-27 1.23-35.1 1.5-103.45 1.5-68.36 0-76.45-.27-103.45-1.5-24.96-1.14-38.51-5.3-47.53-8.81-11.95-4.65-20.48-10.2-29.44-19.15-8.96-8.96-14.5-17.5-19.15-29.44-3.5-9.02-7.67-22.58-8.81-47.53-1.23-27-1.5-35.1-1.5-103.45s.27-76.45 1.5-103.45c1.14-24.96 5.3-38.51 8.81-47.53 4.65-11.95 10.2-20.48 19.15-29.44 8.96-8.95 17.49-14.5 29.44-19.15 9.02-3.5 22.57-7.67 47.53-8.81 27-1.23 35.1-1.5 103.45-1.5z"
              fill="url(#_Linear1)"
            />
            <path
              d="M256 341.33a85.33 85.33 0 110-170.66 85.33 85.33 0 010 170.66zm0-216.79c-72.6 0-131.46 58.86-131.46 131.46 0 72.6 58.86 131.46 131.46 131.46 72.6 0 131.46-58.86 131.46-131.46 0-72.6-58.86-131.46-131.46-131.46z"
              fill="url(#_Linear2)"
            />
            <path
              d="M423.37 119.35a30.72 30.72 0 11-61.44 0 30.72 30.72 0 0161.44 0z"
              fill="url(#_Linear3)"
            />
          </g>
          <defs>
            <linearGradient
              gradientTransform="scale(-516.448) rotate(-73.16 -.26 .42)"
              gradientUnits="userSpaceOnUse"
              id="_Linear1"
              x1="0"
              x2="1"
              y1="0"
              y2="0"
            >
              <stop offset="0" stopColor="#515bd4" />
              <stop offset=".26" stopColor="#9510b8" />
              <stop offset=".66" stopColor="#e51804" />
              <stop offset="1" stopColor="#feda77" />
            </linearGradient>
            <linearGradient
              gradientTransform="scale(-516.448) rotate(-73.16 -.26 .42)"
              gradientUnits="userSpaceOnUse"
              id="_Linear2"
              x1="0"
              x2="1"
              y1="0"
              y2="0"
            >
              <stop offset="0" stopColor="#515bd4" />
              <stop offset=".26" stopColor="#9510b8" />
              <stop offset=".66" stopColor="#e51804" />
              <stop offset="1" stopColor="#ffbf00" />
            </linearGradient>
            <linearGradient
              gradientTransform="scale(-516.448) rotate(-73.16 -.26 .42)"
              gradientUnits="userSpaceOnUse"
              id="_Linear3"
              x1="0"
              x2="1"
              y1="0"
              y2="0"
            >
              <stop offset="0" stopColor="#515bd4" />
              <stop offset=".26" stopColor="#9510b8" />
              <stop offset=".66" stopColor="#e51804" />
              <stop offset="1" stopColor="#ffbf00" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "clock":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-full w-full"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    case "goal":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-full w-full"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
          />
        </svg>
      );
    case "showUp":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-full w-full"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      );
    case "euro":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    case "arrowUp":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      );
    case "arrowDown":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      );
    case "dots":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      );
    case "pay":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      );
    case "share":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
      );
    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-full w-full"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      );
  }
};

export default Icon;
