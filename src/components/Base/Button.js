export default function Button(props){
    return (
        <button {...props} className={`flex-shrink px-2 border-white border focus:outline-none hover:bg-gray-500 active:bg-gray-400 ${props.className}`} style={{boxShadow: "2px 2px 0px 0px rgba(224,224,224,1)"}}>{props.children}</button>
    )
}