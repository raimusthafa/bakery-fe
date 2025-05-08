import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";

type Props = {
  isOpen: boolean;
  initialName: string;
  onClose: () => void;
  onSave: (name: string) => void;
};

const CategoryModal = ({ isOpen, onClose, onSave, initialName }: Props) => {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            enter="ease-out duration-200"
            enterFrom="scale-95 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="ease-in duration-100"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-95 opacity-0"
          >
            <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-md">
              <Dialog.Title className="text-lg font-semibold mb-4">
                {initialName ? "Edit Kategori" : "Tambah Kategori"}
              </Dialog.Title>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama kategori"
                className="w-full border rounded px-3 py-2 mb-4"
              />

              <div className="flex justify-end space-x-2">
                <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
                  Batal
                </button>
                <button
                  onClick={() => onSave(name)}
                  disabled={!name.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                >
                  Simpan
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CategoryModal;
