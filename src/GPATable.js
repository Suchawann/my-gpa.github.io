import { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { FaTrash } from 'react-icons/fa';
import LineChart from './LineChart';

// Stores semester data
      // semGPA stores semesters
      // semGPA stores semesters, grade, creds, gpa
      // semGPA stores gpa
      var semGPA = []
      var semGPA2 = []
      var semGPA3 = []

function GPATable({ data, setDataItems, courseData }) {

    const [dataRows, setDataRows] = useState();
    const [totalGPA, setTotalGPA] = useState(0);

    const styles = {
      textCenter: {textAlign: 'center'},
      textRight: {textAlign: 'right'},
      textLeft: {textAlign: 'left'}
    }

    useEffect(() => {

      let gpa = 0
      let currGrade = 0
      let cred = 0
      let totalCred = 0
      //let count = 0

      const z = data.map((v, i) => {

        // Get grade
        if (v.grade === "A") {
          currGrade = "4.00"
        } else if (v.grade === "A-") {
          currGrade = "3.75"
        } else if (v.grade === "B+") {
          currGrade = "3.25"
        } else if (v.grade === "B") {
          currGrade = "3.00"
        } else if (v.grade === "B-") {
          currGrade = "2.75"
        } else if (v.grade === "C+") {
          currGrade = "2.25"
        } else if (v.grade === "C") {
          currGrade = "2.00"
        } else if (v.grade === "C-") {
          currGrade = "1.75"
        } else if (v.grade === "D") {
          currGrade = "1.00"
        } else if (v.grade === "F") {
          currGrade = "0.00"
        } else if (v.grade === "-") {
          currGrade = "0.00"
          //count -= 1
        }

        // Get credits and total credits
        courseData.forEach((e) => {
          //console.log(e)
          if (v.grade !== "-" && e[0] === v.course) {
            cred = e[2]
            totalCred += Number(cred)
          }
        })

        // Get part of gpa: SUM(grade * credits)
        gpa += Number(currGrade) * Number(cred) 
        //count += 1

        let sem = "" + v.term + "/" + v.year
        let existInArr = semGPA.indexOf(sem) > -1
        let semChanged = false
        // If new semester, push
        if (existInArr === false) {
          semGPA.push(sem)
          semChanged = true
        }
        //console.log("semesters", semGPA)

        // If new semester added, push
        if (semChanged === true) {
          semGPA2.push([sem, 0, 0, 0, 0]) // semester, grade, cred, SUM(grade * credits), gpa
          semGPA3.push([sem, 0]) // semester, gpa
        }

        // Calculate each semester's grade, creds, gpa
        let currGPA = 0
        semGPA2.forEach((s) => {
          if (s[0] === sem) {
            s[1] += Number(currGrade) //total grade
            s[2] += Number(cred) //total creds
            s[3] += Number(currGrade) * Number(cred) // total grade * total creds
            s[4] = s[3] / s[2] //total gpa
            currGPA = s[4]
          }
          //console.log(s)
        })
        //console.log("semesters stats", semGPA2)

        semGPA3.forEach((sg) => {
          if (sg[0] === sem) {
            sg[1] = currGPA
          }
        })
        //console.log("semester, gpa", semGPA3)
        
        return (
          <tr key={i}>
            <td><FaTrash onClick={() => deleteClick(i)}/></td>
            <td style={styles.textleft}>{v.term}{"/"}{v.year}</td>
            <td style={styles.textleft}>{v.course}</td>
            <td style={styles.textLeft}>{v.grade}</td>
          </tr>
        );
      });
    console.log("sum gpa, credits:", gpa, totalCred)
    setDataRows(z);
    setTotalGPA(gpa / totalCred) // SUM(grade * credits) / SUM(credits) 
    }, [data]);

    // Clear table's data
    const clearData = () => {
      setDataItems([])
      setDataRows([])
      console.log('cleared items')
    }

    // Delete 1 item from table
    const deleteClick = (i) => {
      console.log(i, 'deleted!')
      data.splice(i,1)
      setDataItems([...data])
    }

    return (
      <Container>

        <Row>

          <Col>
            <h2>My GPA</h2>
          </Col>

          <Col>
            <Button onClick={clearData} variant="dark">Clear</Button>
          </Col>

        </Row>

        <Table striped bordered hover>

          <thead>
            <tr>
              <th></th>
              <th>Semester</th>
              <th>Course</th>
              <th>Grade</th>
            </tr>
          </thead>

          <tbody>
            {dataRows}
          </tbody>

          <tfoot>
            <tr>
              <th colSpan={2}></th>
              <th style={styles.textRight}>GPA</th>
              <th style={styles.textRight}>{(totalGPA).toFixed(2)}</th>
            </tr>
          </tfoot>

        </Table>

        <Row>
          <LineChart semData={semGPA3}/>
        </Row>

        </Container>
    )
}

export default GPATable;