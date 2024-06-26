import { useContext } from "react"
import { GlobalContext } from "../../context"
import RecipeItem from "../../components/recipe-list"



export default function Home() {

	const { recipeList, loading } = useContext(GlobalContext)
	console.log(recipeList.id)

	if (loading) return <div className="container mx-auto justify-center text-center">Loading... Please wait!</div>

	return <div className="py-3 container mx-auto flex flex-wrap justify-center gap-10">
		{
			recipeList && recipeList.length > 0 ? (
				recipeList.map((item) => <RecipeItem item={item} />)
			)
				: (<div>
					<p className="p-5">
						Try searching term like "Apple, Banana, cucumber"
					</p>
					<p className="mt-5 lg:text-xl text-xl text-center text-black font-extrabold">
						No recipes found. Please search something else.
					</p>

				</div>)
		}
	</div>
}
