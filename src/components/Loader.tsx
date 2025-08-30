import { Spinner } from 'flowbite-react';

const Loader = () => {
    return (
        <div className="min-h-[calc(100dvh-198px)]  flex justify-center items-center">
            <Spinner size="xl" />
        </div>
    );
};

export default Loader;
