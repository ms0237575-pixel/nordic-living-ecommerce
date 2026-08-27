export function ProductCardSkeleton() {
  return (
    <div className="group relative animate-pulse">
      <div className="aspect-4/5 w-full bg-nordic-gray/20" />
      <div className="mt-4 space-y-2">
        <div className="h-4 w-3/4 bg-nordic-gray/20" />
        <div className="h-4 w-1/4 bg-nordic-gray/20" />
        <div className="mt-4 h-11 w-full bg-nordic-gray/15" />
      </div>
    </div>
  );
}
