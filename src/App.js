import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useRef, useState  } from 'react';
import useLocalStorage from 'react-localstorage-hook';
import Data from './cs-2019.json';
import GPATable from './GPATable';

function App() {

  const yearRef = useRef();
  const termRef = useRef();
  const courseRef = useRef();
  const gradeRef = useRef();

  // Local storage
  const [dataItems, setDataItems] = useLocalStorage("dataItems", []);

  // Record course info for later use
  var courseData = []

  // Map product list to <option>
  var x = []
  const options = Data.curriculum.subjects.map((v, i) => {
    x = [] // empty x
    // Loop through subjects to push their name as option into x
    v.subjects.forEach((e, j) => {
      // Add option
      x.push(<option key={j} value={e.name}>{e.code} {e.name}</option>)
      // Record course info for later use
      courseData.push([e.name, e.code, e.credits])
    })
    //console.log(x)
    return x
  })

  // Add items
  const addItem = () => {

    // Assign values
    var itemObj = {
      year: yearRef.current.value,
      term: termRef.current.value,
      course: courseRef.current.value,
      grade: gradeRef.current.value
    }

    // Push itemObj into dataItems
    console.log('before', dataItems)
    dataItems.push(itemObj)
    //setDataItems(dataItems)
    setDataItems([...dataItems])
    console.log('after', dataItems)
  }

  return (
    <Container>

      <Row>
        <Col xs={5} style={{backgroundColor: '#eaeaea'}}>
          <br/><h5>Course Information</h5><br/>
          <Form>

            <Row>
              <Form.Group as={Col} className="mb-3" controlId="formYear">
                <Form.Label>Year</Form.Label>
                <Form.Select aria-label="Select year" ref={yearRef}>
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} className="mb-3" controlId="formTerm">
                <Form.Label>Term</Form.Label>
                <Form.Select aria-label="Select semester" ref={termRef}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </Form.Select>
              </Form.Group>     
            </Row>  

            <Form.Group as={Col} className="mb-3" controlId="formCourse">
              <Form.Label>Course</Form.Label>
              <Form.Select aria-label="Select course" ref={courseRef}>
                {options}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="formGrade">
              <Form.Label>Grade</Form.Label>
              <Form.Select aria-label="Select grade" ref={gradeRef}>
                <option value="A">A</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="B-">B-</option>
                <option value="C+">C+</option>
                <option value="C">C</option>
                <option value="C-">C-</option>
                <option value="D">D</option>
                <option value="F">F</option>
                <option value="-">W, I, S, U, R, TR</option>
              </Form.Select>
            </Form.Group>

            <Button variant="outline-dark" onClick={addItem}>
              Add
            </Button>

          </Form>
        </Col>

        <Col>
          <GPATable data={dataItems} setDataItems={setDataItems} courseData={courseData}/>
        </Col>

      </Row>

    </Container>
  );
}

export default App;
