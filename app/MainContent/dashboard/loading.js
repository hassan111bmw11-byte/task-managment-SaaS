export default function Loading() {
    return (
            <div className="flex items-center justify-center h-screen bg-gradent-to-r from-blue-600 to-blue-400">
                <div className="flex flex-col items-center gap-4">
                    {/* spinner */}
                    <div className="animate-spin rounded-full h-12 w-12 border-4  border-white border-t-transparent"></div>
                    <h1 className="text-2xl font-lg font-semibold text-white">Loading Dashboard...</h1>
                </div>
            </div>

    );
}