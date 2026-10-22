export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      {/* Background Static ambient lights */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-white/[0.015] rounded-full blur-[160px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-white/[0.015] rounded-full blur-[160px]" />
    </div>
  )
}
