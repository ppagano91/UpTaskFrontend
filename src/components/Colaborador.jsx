import React from 'react'
import useProyectos from '../hooks/useProyectos'

const Colaborador = ({colaborador}) => {
    const {nombre,email} = colaborador

    const {handleModalEliminarColaborador} = useProyectos()

  return (
    <div className='border-b p-5 flex justify-between items-center'>
        <div>
            <p className='text-lg font-bold'>{nombre}</p>
            <p className='text-sm text-gray-700'>{email}</p>
        </div>
        <div>
            <button
                type='button'
                className='bg-red-600 px-4 py-3 text-white font-bold uppercase text-sm rounded-lg hover:bg-red-600'
                onClick={() => handleModalEliminarColaborador(colaborador)}
            >
                Eliminar
            </button>

        </div>
    </div>
  )
}

export default Colaborador