export default function NavBar({ titles, onTitleClick }) {
    return (
        <div className="pt-5 pl-10 pr-10 flex">
            <div className="p-3 flex-1 text-7xl font-bold font-mono">
                <button>GRAM™</button>
            </div>
            <div className="flex-1 font-light font-serif flex items-center justify-end">
                {titles.map((title, index) => (
                    <button key={index} onClick={() => onTitleClick(title)} className="m-3 hover:text-[#92C7CF]">
                        {title}
                    </button>
                ))}
            </div>
        </div>
    );
}
