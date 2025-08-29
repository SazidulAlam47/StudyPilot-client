/* eslint-disable @typescript-eslint/no-explicit-any */
const SFromError = ({ error }: { error: any }) => {
    return (
        <>
            {error && (
                <p className="text-sm text-destructive mt-1">
                    {error?.message as string}
                </p>
            )}
        </>
    );
};

export default SFromError;
