import { Button } from "@/components/ui/button"

const ContentPage = () => {
  return (
    // <></>
    <div className="flex flex-col items-center justify-center h-[80vh] w-[50vw] rounded-2xl z-[10000] backdrop-blur-lg absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white/10 text-white">
        <h1>Random Quotes</h1>
        <Button>Click me</Button>
        <p>Click the button below to generate a random quote!</p>
        <button>Generate Quote</button>
    </div>
  )
}

export default ContentPage