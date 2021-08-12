import { getErrorText } from "../helpers/errorMapper";
type ErrorModalProps = {
  headline: string;
  errorMessage?: string;
  message?: string;
  show: boolean;
  toggle: Function;
  confirm?: Function;
  buttonConfirmText?: string;
};

const ErrorModal = ({
  errorMessage,
  message,
  confirm,
  show,
  toggle,
  headline,
  buttonConfirmText,
}: ErrorModalProps) => {
  return (
    <>
      {show ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => toggle(!show)}
          >
            <div className="relative min-w-1/4 w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h2>{headline}</h2>
                </div>
                <div className="relative p-4 flex-auto">
                  {errorMessage && (
                    <p
                      className="my-4 text-gray-600 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: getErrorText(errorMessage),
                      }}
                    ></p>
                  )}
                  {message && (
                    <p className="my-4 text-gray-600 leading-relaxed">
                      {message}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-end p-4 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={confirm ? () => confirm() : () => toggle(!show)}
                  >
                    {buttonConfirmText || "Ok"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default ErrorModal;
