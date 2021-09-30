import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';
import { GridContainer, Div } from '../Sections';
import { Button, Colors } from '../Styling';
import Icon from '../Icon';

const formIsValid = (formData = null) => {
  if (!formData) return null;
  for (let key in formData) {
      if (!formData[key].valid) return false;
  }
  return true;
}

const ModalBox = styled.div`
  position: fixed;
  padding: ${(props) => props.padding};
  left: 50%;
  top: ${(props) => props.top || '50%'};
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100vh;
  z-index: 1000;
  background: white;
  overflow: hidden;
  display: ${(props) => (props.open ? 'block' : 'none')};
`;
const ApplyJobModal = (props) => {
  const [formStatus, setFormStatus] = useState({
    status: 'idle',
    msg: 'Resquest',
  });
  const [formData, setVal] = useState({
    full_name: { value: '', valid: false },
    location: { value: '', valid: false },

    email: { value: '', valid: false },
    phone: { value: '', valid: false },

    resume: { value: null, valid: true },
    linkedin: { value: '', valid: true },
    website: { value: '', valid: true },
  });
  return (
    <ModalBox top={props.top} padding={props.boxPadding} open={props.open}>
      <GridContainer
        github="/components/job"
        columns_tablet="12"
        margin_tablet="70px 0 0 0"
        margin="70px 0 0 0"
        padding="30px 0 0 0"
        padding_tablet="30px 0 0 0"
      >
        <Div flexDirection="column" gridColumn_tablet=" 2 / 12">
          <Button
            style={{ margin: '8px 0 0 0', padding: '0', width: 'fit-content' }}
            onClick={props.onClose}
          >
            <Icon
              icon="arrowLeft2"
              width="32"
              // color={Colors.blue}
              // fill={Colors.blue}
            />
          </Button>

          {formStatus.status === 'thank-you' ? (
            <Div alignItems="center">
              <Icon icon="success" />
              <H4
                fontSize="15px"
                lineHeight="22px"
                margin="10px 0 10px 10px"
                align="center"
              >
                {yml.newsletter.thankyou}
              </H4>
            </Div>
          ) : (
            <>
              <H4
                margin="0 0 10px 0"
                textAlign="left"
                display="none"
                display_tablet="block"
              >
                {yml.newsletter.heading}
              </H4>
              <Div justifyContent="center" width="100%">
                <Form
                  onSubmit={(e) => {
                    console.log('E:', e);
                    e.preventDefault();
                    if (formStatus.status === 'error') {
                      setFormStatus({ status: 'idle', msg: 'Resquest' });
                    }
                    if (!formIsValid(formData)) {
                      setFormStatus({
                        status: 'error',
                        msg: 'There are some errors in your form',
                      });
                    } else {
                      setFormStatus({ status: 'loading', msg: 'Loading...' });
                      newsletterSignup(formData, session)
                        .then((data) => {
                          if (
                            data.error !== false
                            && data.error !== undefined
                          ) {
                            setFormStatus({
                              status: 'error',
                              msg: 'Fix errors',
                            });
                          } else {
                            setFormStatus({
                              status: 'thank-you',
                              msg: 'Thank you',
                            });
                          }
                        })
                        .catch((error) => {
                          console.log('error', error);
                          setFormStatus({
                            status: 'error',
                            msg: error.message || error,
                          });
                        });
                    }
                  }}
                >
                  <Input
                    type="text"
                    className="form-control"
                    width="100%"
                    placeholder="Full name *"
                    borderRadius="3px"
                    bgColor={Colors.white}
                    margin="0"
                    onChange={(value, valid) => {
                      setVal({ ...formData, full_name: { value, valid } });
                      if (formStatus.status === 'error') {
                        setFormStatus({ status: 'idle', msg: 'Resquest' });
                      }
                    }}
                    value={formData.full_name.value}
                    errorMsg="Full name is required"
                    required
                  />

                  <Input
                    type="text"
                    className="form-control"
                    width="100%"
                    placeholder="Location *"
                    borderRadius="3px"
                    bgColor={Colors.white}
                    margin="0"
                    onChange={(value, valid) => {
                      setVal({ ...formData, location: { value, valid } });
                      if (formStatus.status === 'error') {
                        setFormStatus({ status: 'idle', msg: 'Resquest' });
                      }
                    }}
                    value={formData.location.value}
                    errorMsg="Full name is required"
                    required
                  />
                  {/*NOTE: 2 column here */}
                  <Input
                    type="email"
                    className="form-control"
                    width="100%"
                    placeholder="Email *"
                    borderRadius="3px"
                    bgColor={Colors.white}
                    margin="0"
                    onChange={(value, valid) => {
                      setVal({ ...formData, email: { value, valid } });
                      if (formStatus.status === 'error') {
                        setFormStatus({ status: 'idle', msg: 'Resquest' });
                      }
                    }}
                    value={formData.email.value}
                    errorMsg="Please specify a valid email"
                    required
                  />

                  <Input
                    type="text"
                    className="form-control"
                    width="100%"
                    placeholder="Phone *"
                    borderRadius="3px"
                    bgColor={Colors.white}
                    margin="0"
                    onChange={(value, valid) => {
                      setVal({ ...formData, phone: { value, valid } });
                      if (formStatus.status === 'error') {
                        setFormStatus({ status: 'idle', msg: 'Resquest' });
                      }
                    }}
                    value={formData.phone.value}
                    errorMsg="Please specify a valid phone"
                    required
                  />



                  {/* TODO: Resume file here */}
                  <Input
                    type="file"
                    className="form-control"
                    width="100%"
                    // placeholder="Resume *"
                    borderRadius="3px"
                    bgColor={Colors.white}
                    margin="0"
                    onChange={(value, valid) => {
                      setVal({ ...formData, resume: { value, valid } });
                      if (formStatus.status === 'error') {
                        setFormStatus({ status: 'idle', msg: 'Resquest' });
                      }
                    }}
                    value={formData.resume.value}
                    errorMsg="Please send your resume file"
                    required
                  />



                  <Button
                    height="40px"
                    margin="0 0 0 10px"
                    type="submit"
                    fontSize="22px"
                    variant="full"
                    borderRadius="3px"
                    color={
                      formStatus.status === 'loading'
                        ? Colors.darkGray
                        : Colors.black
                    }
                    textColor={Colors.white}
                    disabled={formStatus.status === 'loading' ? true : false}
                  >
                    {formStatus.status === 'loading' ? (
                      'Loading...'
                    ) : (
                      <Icon
                        icon="send"
                        height="16px"
                        width="16px"
                        color={Colors.white}
                        fill={Colors.white}
                      />
                    )}
                  </Button>
                </Form>
              </Div>
            </>
          )}

          {props.children}
        </Div>
      </GridContainer>
    </ModalBox>
  );
};
ApplyJobModal.propTypes = {
  open: PropTypes.bool,
};
ApplyJobModal.defaultProps = {
  open: false,
};
export default ApplyJobModal;
