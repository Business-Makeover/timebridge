import { Box, Container, Heading, Text } from '@chakra-ui/react';

function App() {
  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="container.xl" py={10}>
        <Heading mb={4}>Frontend App</Heading>
        <Text>Start prompting (or editing) to see magic happen :)</Text>
      </Container>
    </Box>
  );
}

export default App;