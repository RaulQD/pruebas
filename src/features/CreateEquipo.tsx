import { ErrorMessage } from '@/components/ui/ErrorMessage';
import api from '@/lib/axios';
import { Equipo } from '@/types/equipos';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

export default function CreateEquipo() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Equipo>();
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: Equipo) => {
            const response = await api.post(
                'http://localhost:8080/api/equipos',
                data
            );
            return response.data;
        },
        onSuccess: (data) => {
            alert(data.message || 'Registro exitoso');
            reset(); // Resetea el formulario
        },
        onError: (error) => {
            alert(error.message || 'Ocurrió un error');
        },
    });

    const onSubmit = (data: Equipo) => {
        mutate(data);
    };
    return (
        <div className='flex items-center justify-center h-screen bg-gray-100'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='w-full max-w-md bg-white p-6 rounded-lg shadow-md'>
                <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>
                    Registrar Equipo
                </h2>
                {/* Código del Equipo */}
                <div>
                    <label
                        className='block text-gray-700 font-medium mb-2'
                        htmlFor='codigoEquipo'>
                        Código del Equipo
                    </label>
                    <input
                        id='codigoEquipo'
                        {...register('codigoEquipo', {
                            required: 'El código del equipo es requerido.',
                            pattern: {
                                value: /^PR\d{4}$/,
                                message:
                                    'El código debe comenzar con PR seguido de 4 números.',
                            },
                        })}
                        className={`w-full px-4 py-2 border rounded-md ${
                            errors.codigoEquipo
                                ? 'border-red-500'
                                : 'border-gray-300'
                        }`}
                    />
                    {errors.codigoEquipo && (
                        <ErrorMessage>
                            {errors.codigoEquipo.message}
                        </ErrorMessage>
                    )}
                </div>

                {/* Nombre del Equipo */}
                <div>
                    <label
                        className='block text-gray-700 font-medium mb-2'
                        htmlFor='nombreEquipo'>
                        Nombre del Equipo
                    </label>
                    <input
                        id='nombreEquipo'
                        {...register('nombreEquipo', {
                            required: 'El nombre del equipo es requerido.',
                            pattern: {
                                value: /^[A-Za-z ]{4,}$/,
                                message:
                                    'El nombre debe tener al menos 4 caracteres alfabéticos.',
                            },
                        })}
                        className={`w-full px-4 py-2 border rounded-md ${
                            errors.nombreEquipo
                                ? 'border-red-500'
                                : 'border-gray-300'
                        }`}
                    />
                    {errors.nombreEquipo && (
                        <ErrorMessage>
                            {errors.nombreEquipo.message}
                        </ErrorMessage>
                    )}
                </div>

                {/* Fecha del siguiente mantenimiento */}
                <div>
                    <label
                        className='block text-gray-700 font-medium mb-2'
                        htmlFor='fechaSiguienteMantenimiento'>
                        Fecha del Siguiente Mantenimiento
                    </label>
                    <input
                        id='fechaSiguienteMantenimiento'
                        type='date'
                        {...register('fechaSiguienteMantenimiento', {
                            required:
                                'La fecha del siguiente mantenimiento es requerida.',
                           
                        })}
                        className={`w-full px-4 py-2 border rounded-md ${
                            errors.fechaSiguienteMantenimiento
                                ? 'border-red-500'
                                : 'border-gray-300'
                        }`}
                    />
                    {errors.fechaSiguienteMantenimiento && (
                        <ErrorMessage>
                            {errors.fechaSiguienteMantenimiento.message}
                        </ErrorMessage>
                    )}
                </div>

                {/* Botón de enviar */}
                <button
                    type='submit'
                    disabled={isPending}
                    className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition mt-5'>
                    {isPending ? 'Enviando...' : 'Registrar Equipo'}
                </button>
            </form>
        </div>
    );
}
