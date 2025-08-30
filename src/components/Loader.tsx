import { Spinner } from 'flowbite-react';

const Loader = () => {
    return (
        <div className="min-h-[calc(100dvh-198px)]  flex justify-center items-center">
            <Spinner aria-label="Center-aligned spinner example" />
        </div>
    );
};

export default Loader;
