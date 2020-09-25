import React from 'react';
import Hero, { Heading, SubHeading, Footer } from '../Hero/Hero';

export default function Page404() {
	return (
		<Hero>
			<Heading>Page not found.</Heading>
			<SubHeading>Sorry but the request page does not exist.</SubHeading>
			<Footer forPage="404" />
		</Hero>
	);
}
