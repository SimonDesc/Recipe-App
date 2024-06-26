import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../context";


export default function Navbar() {

	const {searchParam, setSearchParam, handleSubmit} = useContext(GlobalContext)


	return <nav className="flex justify-between items-center py-8 container mx-auto flex-col lg:flex-row gap-5 lg:gap:0">
		<h2 className="text-2xl font-semibold">
			<NavLink to={'/'} >FoodRecipes</NavLink>
		</h2>

		<form onSubmit={handleSubmit}>
			<input
				type="text"
				name="search"
				value={searchParam}
				onChange={(event) => setSearchParam(event.target.value)}
				placeholder="Search an ingredient..."
				className="bg-white/75 p-2 px-8 rounded-full outline-none lg:w-96 shadow-lg shadow-red-100 focus:shadow-red-200"></input>
		</form>

		<ul className="flex gap-6">
			<li>
				<NavLink to={'/'} className='text-black hover:text-gray-500 duration-300'>Home</NavLink>
			</li>
			<li>
				<NavLink to={'/favorites'} className='text-black hover:text-gray-500 duration-300'>Favorites</NavLink>
			</li>
		</ul>
	</nav>
}
