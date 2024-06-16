import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [allData, setAllData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentDescription, setCurrentDescription] = useState('');
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    fetch("data.json")
      .then(res => res.json())
      .then(data => setAllData(data))
  }, []);

  console.log(allData)

  const openModal = (data) => {
    setCurrentImage(data.image);
    setCurrentDescription(data.description);
    setCurrentUser(data.user);
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  return (
    <>
      <div className='min-h-screen bg-black'>
        <div className='text-4xl text-center py-5 text-white'>
          <h1>Gallery Page</h1>
        </div>
        <hr />

        <div className='w-full max-w-5xl p-5 pb-5 mx-auto gap-5 columns-3 lg:columns-4 md:columns-3 space-y-5'>

          {
            allData.map((data, index) => (
              <img
                key={index}
                src={data.image}
                alt={data.description}
                onClick={() => openModal(data)}
                className="w-48 cursor-pointer border-2 border-white rounded hover:scale-105"
              />
            ))
          }

        </div>

          {
            modalIsOpen && 
            (
              <div className="modal modal-open">
              <div className="modal-box">

                {currentImage && <img src={currentImage} alt={currentDescription} className="w-full mt-4 rounded" />}
                <p className="mt-4 font-bold text-xl">{currentUser}</p>
                <p className='mt-4'>{currentDescription}</p>

                <div className="modal-action">
                  <button className="btn btn-sm rounded-full" onClick={closeModal}>
                      X
                  </button>
                </div>
              </div>
            </div>
            )
          }

      </div>
    </>
  )
}

export default App
