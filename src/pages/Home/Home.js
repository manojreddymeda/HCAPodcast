import { useState } from 'react';
import { Container, Row } from 'reactstrap';
import Navbar from '../../components/Navbar/Navbar'
import VideoList from '../../components/VideoList/VideoList'

function Home() {
  const [search, setSearch] = useState()
  const [filter, setFilter] = useState()


  return (
    <Container fluid>
      <Row>
        <Navbar search={search} onSearch={setSearch} filter={filter} onFilter={setFilter} />
      </Row>
      <Row className="justify-content-md-center mt-2">
        <VideoList search={search} filter={filter} />
      </Row>
    </Container>
  );
}

export default Home;
