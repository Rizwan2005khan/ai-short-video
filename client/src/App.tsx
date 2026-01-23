import Navbar from './components/Navbar';
import Home from './pages/Home';
import SoftBackdrop from './components/SoftBackdrop';
import Footer from './components/Footer';
import LenisScroll from './components/lenis';
import { Route, Routes } from 'react-router-dom';
import Generator from './pages/Generator';
import Result from './pages/Result';
import MyGeneration from './pages/MyGeneration';
import Community from './pages/Community';
import Plan from './pages/Plan';
import Loading from './pages/Loading';

function App() {
	return (
		<>
			<SoftBackdrop />
			<LenisScroll />
			<Navbar />

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/generate' element={<Generator />} />
				<Route path='/result/:projectId' element={<Result />} />
				<Route path='/my-generations' element={<MyGeneration />} />
				<Route path='/community' element={<Community />} />
				<Route path='/plans' element={<Plan />} />
				<Route path='/loading' element={<Loading />} />
			</Routes>
			

			<Footer />
		</>
	);
}
export default App;