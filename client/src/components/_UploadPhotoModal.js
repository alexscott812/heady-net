import React, { useState, useContext } from 'react';
import { Form, Card, Button, Modal, Alert } from 'react-bootstrap';
import axios from 'axios'
import AuthContext from '../context/AuthContext.js';

const UploadPhotoModal = (props) => {

  const { userData } = useContext(AuthContext);

  const [photoString, setPhotoString] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleClose = () => {
    setPhotoString("");
    setSubmitSuccess(false);
    setSubmitError(null);
    props.onHide();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        console.log(reader.result);
        setPhotoString(reader.result);
      };
    } else {
      setPhotoString("");
    };

  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!photoString) return;
    postImage(photoString);
  };

  const postImage = async (b64image) => {
    try {
      setIsSubmitting(true);
      const token = userData.token;
      const user = userData.user;
      const res = await axios.post('http://localhost:5000/api/photos', {
        show_id: props.showId,
        image_data: b64image,
        user_id: user._id
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.data;
      const newData = {
        _id: data._id,
        url: data.url,
        thumbnail_md_url: data.thumbnail_md_url,
        thumbnail_sm_url: data.thumbnail_sm_url,
        show_id: data.show_id,
        created_at: data.created_at,
        updated_at: data.updated_at,
        user: user
      };
      setSubmitSuccess(true);
      props.handlePhotoPost(newData);
    } catch(err) {
      if (err.response) {
        setSubmitError(err.response.data.msg);
      } else {
        setSubmitError('Uh oh... Something went wrong.');
      };
    }
    setIsSubmitting(false);
  };

  return (
    <>

      <Modal show={props.show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Photo</Modal.Title>
        </Modal.Header>

        {!submitSuccess ?
          <>
            <Modal.Body>
              {userData ?
                <>
                  <Card className="mb-3">
                    <Card.Body>
                      <div style={{paddingBottom: '0.75rem'}}>
                        <span style={{fontSize:'1rem',fontWeight:'500'}}>{userData.name}</span>
                      </div>
                      <Form.File id="formcheck-api-regular">
                        <Form.File.Input accept="image/*" onChange={handleFileInputChange}/>
                      </Form.File>
                      {photoString &&
                        <div className="mt-3">
                          <img style={{maxWidth:'100%'}} src={photoString} alt="chosen file" />
                        </div>
                      }

                    </Card.Body>
                  </Card>
                  <Button variant="primary" block disabled={isSubmitting || !photoString}
                    onClick={!isSubmitting ? handleSubmitFile : null}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </Button>
                </>
              :
                <Alert variant={"danger"}>Not authorized to write review!</Alert>
              }

              {submitError && <Alert className="mt-3 mb-0" variant={"danger"}>{submitError}</Alert>}
            </Modal.Body>

          </>
          :
          <>
            <Modal.Body>
            <Alert variant={"success"}>Photo submitted successfully!</Alert>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" disabled={isSubmitting}
               onClick={!isSubmitting ? handleClose : null}>
               Close
              </Button>
            </Modal.Footer>
          </>
        }

      </Modal>
    </>

  );
}

export default UploadPhotoModal;
