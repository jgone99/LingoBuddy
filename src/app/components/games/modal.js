import Link from "next/link";

const Modal = ({ won, isPending, modalContinue }) => {

    return (
      <div id="games-modal" className="fade-in games-modal fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
        <div className="p-8 border w-96 shadow-lg rounded-md bg-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900">{won ? 'You did it!' : 'You lost...'}</h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-lg text-gray-500">Do you wish to continue?</p>
            </div>
            <div className="flex justify-evenly mt-4">
  
              {/* Navigates back to the base URL - closing the modal */}
              <button
                disabled={isPending}
                onClick={modalContinue}
                className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                {isPending ? 'Pending...' : 'Continue'}
              </button>
  
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default Modal;