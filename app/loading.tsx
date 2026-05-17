export default function Loading() {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center bg-white px-6">
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 rounded-full border-2 border-[#0f1f34]/12" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#c9a15d] animate-spin" />
      </div>
    </div>
  );
}

