
export default function ConfirmWindow({  
  open,  
  message = "Ești sigur?",  
  onConfirm,  
  onCancel  
}) {  
  if (!open) return null;  

  return (  
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">  
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-80 shadow-lg">  
        <p className="text-gray-800 dark:text-gray-200 mb-4">{message}</p>  
        <div className="flex justify-end space-x-2">  
          <button  
            onClick={onCancel}  
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition"  
          >  
            Anulează  
          </button>  
          <button  
            onClick={onConfirm}  
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"  
          >  
            Șterge  
          </button>  
        </div>  
      </div>  
    </div>  
  );  
}
