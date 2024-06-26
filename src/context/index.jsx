import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../useLocalStorage/useLocalStorage";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {

	const [searchParam, setSearchParam] = useState('')
	const [loading, setLoading] = useState(false)
	const [recipeList, setRecipeList] = useState([])
	const [recipeDetailsData, setRecipeDetailsData] = useState(null)
	const [favoritesList, setFavoritesList] = useLocalStorage("favorites",[])

	const navigate = useNavigate()

	async function handleSubmit(event) {
		event.preventDefault()
		try {
			setLoading(true)
			const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`)
			const data = await res.json()

			if (data?.data?.recipes) {
				setRecipeList(data?.data?.recipes)
				setLoading(false)
				setSearchParam('')
				navigate('/')
			}

		} catch (error) {
			console.log(error)
			setLoading(false)
			setSearchParam('')
		}

	}

	function handleAddToFavorite(getCurrentItem) {
		let cpyFavoritesList = [...favoritesList]
		const index = cpyFavoritesList.findIndex(item => item.id === getCurrentItem.id)
		
		// If not in favorite
		if (index === -1) {
			cpyFavoritesList.push(getCurrentItem)
		} else {
			cpyFavoritesList.splice(index, 1)
		}

		setFavoritesList(cpyFavoritesList)
	}




	return <GlobalContext.Provider value={{ searchParam, loading, recipeList, setSearchParam, handleSubmit, recipeDetailsData, setRecipeDetailsData, handleAddToFavorite, favoritesList}}>{children}</GlobalContext.Provider>
}
