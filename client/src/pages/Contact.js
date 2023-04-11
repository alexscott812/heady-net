import React from 'react';
import { Text, GridItem } from '@chakra-ui/react';
import Grid from '../components/Grid';
import PageContainer from '../components/PageContainer.js';
import Card from '../components/Card.js';
import CardBody from '../components/CardBody.js';
import CardTitle from '../components/CardTitle.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

const Contact = () => {
	useDocumentTitle('Contact | shakedown');

	return (
		<PageContainer>
			<Grid>
				<GridItem colSpan={[12, 12, 12, 8]}>
					<Card>
						<CardBody>
							<CardTitle>Contact</CardTitle>
							<Text>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
								tortor ligula, convallis vel ante eu, gravida cursus magna.
								Aenean lorem augue, dignissim sit amet finibus et, bibendum vel
								ipsum. Nulla in ex libero. Etiam dignissim sem pretium accumsan
								varius. Integer facilisis odio at ex ultricies, a aliquet mauris
								efficitur. Morbi gravida massa ac tempor semper. Nullam
								consectetur ligula quis metus faucibus, at aliquam ipsum
								lobortis. Praesent enim ligula, sodales id magna et, ultrices
								lacinia mauris. Duis et risus at tellus placerat bibendum.
								Vestibulum finibus, magna ut aliquet laoreet, libero risus
								sodales sem, ac finibus tellus neque nec tellus. Proin vel nunc
								vitae orci semper porta et sed nibh. Vestibulum tristique at
								ante eget auctor. Nunc condimentum ut velit sit amet hendrerit.
							</Text>
						</CardBody>
					</Card>
				</GridItem>
			</Grid>
		</PageContainer>
	);
};

export default Contact;
