import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { LockClosedIcon } from '@heroicons/react/24/outline'; // Remplacez CheckIcon par LockClosedIcon pour mieux correspondre au contexte

export default function OfflinePasswordModal({ onSubmit }) {
  const [open, setOpen] = useState(true);
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onSubmit(password); // Appelle la fonction de soumission passée en prop avec le mot de passe saisi
    setOpen(false); // Ferme la modal après la soumission
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <LockClosedIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                      Définissez un mot de passe hors ligne
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Ce mot de passe sera utilisé pour vous connecter en mode hors ligne.
                      </p>
                      <input
                        type="password"
                        className="mt-4 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                        placeholder="Mot de passe hors ligne"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={handleSubmit}
                  >
                    Enregistrer
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
