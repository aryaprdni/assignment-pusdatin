export default function UnauthorizedPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
      <p className="text-center mt-2">You do not have permission to access this page.</p>
    </div>
  );
}
