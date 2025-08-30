const SFromError = ({ error }: { error: any }) => {
    return (
        <>
            {error && (
                <p className="text-red-600 text-sm text-destructive ml-0.5 mt-0.5">
                    {error?.message as string}
                </p>
            )}
        </>
    );
};

export default SFromError;
