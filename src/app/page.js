'use client'; 
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import './globals.css';
import MainPage from './pages/Mainpage';

export default function Home() {
	const [projects, setProjects] = useState([]);
	const [projectName, setProjectName] = useState('');
	const [isModalActive, setIsModalActive] = useState(false); 
	const router = useRouter(); 

	const addProject = () => {
		if (projectName.trim()) {
			const newProject = { id: Date.now(), name: projectName, artifacts: [] };
			setProjects([...projects, newProject]);
			setProjectName('');
			setIsModalActive(false); 
		}
	};

	const openProject = (id) => {
		router.push(`/project/${id}`);
	};

	const handleNewProjectClick = () => {
		setIsModalActive(true); 
	};

	
	const handleOutsideClick = (e) => {
		if (e.target.classList.contains('modal-popup')) {
			setIsModalActive(false);
		}
	};


	const handleCloseClick = () => {
		setIsModalActive(false);
	};

	useEffect(() => {

		document.addEventListener('click', handleOutsideClick);


		return () => {
			document.removeEventListener('click', handleOutsideClick);
		};
	}, []);

	return (
		<div className="container mx-auto p-4">
			<MainPage handleNewProjectClick={handleNewProjectClick} /> 

			<div className={`modal-popup ${isModalActive ? 'active' : ''}`}>
				<div className="modal-popup__inner">
					<h2 className="modal-popup__title">Enter your project name</h2>

					
					<button className="modal-popup__close" onClick={handleCloseClick}>
						<svg
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M5.33329 15.8333L4.16663 14.6667L8.83329 10L4.16663 5.33333L5.33329 4.16666L9.99996 8.83333L14.6666 4.16666L15.8333 5.33333L11.1666 10L15.8333 14.6667L14.6666 15.8333L9.99996 11.1667L5.33329 15.8333Z"
								fill="#1D1B20"
							/>
						</svg>
					</button>

					<div className="modal-popup__body">
						<input
							className="modal-popup__input"
							type="text"
							value={projectName}
							onChange={(e) => setProjectName(e.target.value)}
							placeholder="Enter your project name"
						/>
						<button className="modal-popup__confirm" onClick={addProject}>
							Confirm
						</button>
					</div>
				</div>
			</div>
			<h1 className="text-2xl font-bold mb-4">Projects</h1>
			<ul>
				{projects.map((project) => (
					<li
						key={project.id}
						onClick={() => openProject(project.id)}
						className="cursor-pointer hover:text-blue-500">
						{project.name}
					</li>
				))}
			</ul>
		</div>
	);
}
