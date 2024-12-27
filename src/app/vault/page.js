// VaultPage.jsx
import React from 'react';

const VaultPage = () => {
	return (
		<main className="page">
			<div className="wrapper">
				<div className="content">
					<h1 className="content__title">ProjCraft</h1>
					<p className="content__subtitle">
						External vault url: <span className="content__subtitle-value">test.com</span>
					</p>
					<div className="content__doc">
						<ul className="content__doc-list">
							<li className="content__doc-list-item">
								<span className="content__doc-list-item--image">
									<svg
										width="50"
										height="50"
										viewBox="0 0 50 50"
										fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<circle cx="25" cy="25" r="25" fill="#F3F4F6" />
										<path
											d="M20.4625 23.6594H27.0625C27.475 23.6594 27.8531 23.3156 27.8531 22.8687C27.8531 22.4219 27.5094 22.0781 27.0625 22.0781H20.4625C20.05 22.0781 19.6719 22.4219 19.6719 22.8687C19.6719 23.3156 20.0156 23.6594 20.4625 23.6594Z"
											fill="#111928"
										/>
										<path
											d="M20.4625 27.3032H27.0625C27.475 27.3032 27.8531 26.9594 27.8531 26.5126C27.8531 26.0657 27.5094 25.7219 27.0625 25.7219H20.4625C20.05 25.7219 19.6719 26.0657 19.6719 26.5126C19.6719 26.9594 20.0156 27.3032 20.4625 27.3032Z"
											fill="#111928"
										/>
										<path
											d="M29.5375 29.4H20.4625C20.05 29.4 19.6719 29.7438 19.6719 30.1906C19.6719 30.6375 20.0156 30.9813 20.4625 30.9813H29.5719C29.9844 30.9813 30.3625 30.6375 30.3625 30.1906C30.3625 29.7438 29.9844 29.4 29.5375 29.4Z"
											fill="#111928"
										/>
										<path
											d="M33.2844 17.8156H25.3437L24.6219 16.4406C24.2437 15.7531 23.5562 15.3063 22.7656 15.3063H16.7156C15.5469 15.3063 14.6187 16.2344 14.6187 17.4031V32.5969C14.6187 33.7657 15.5469 34.6938 16.7156 34.6938H33.3187C34.4875 34.6938 35.4156 33.7657 35.4156 32.5969V19.9125C35.4156 18.7438 34.4531 17.8156 33.2844 17.8156ZM33.8687 32.5969C33.8687 32.9063 33.6281 33.1469 33.3187 33.1469H16.7156C16.4062 33.1469 16.1656 32.9063 16.1656 32.5969V17.4031C16.1656 17.0938 16.4062 16.8531 16.7156 16.8531H22.7656C22.9719 16.8531 23.1437 16.9563 23.2469 17.1625L24.2094 18.95C24.3469 19.1906 24.6219 19.3625 24.8969 19.3625H33.3187C33.6281 19.3625 33.8687 19.6031 33.8687 19.9125V32.5969Z"
											fill="#111928"
										/>
									</svg>
								</span>
								<span className="content__doc-list-item--name"> document.txt </span>
								<span className="content__doc-list-item--size"> 312kb </span>
								<button className="content__doc-list-item--btn">Download & open</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</main>
	);
};

export default VaultPage;
