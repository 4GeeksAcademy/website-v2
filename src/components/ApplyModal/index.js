import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { H3, H4, Paragraph } from "../Heading";
import Icon from "../Icon";
import { SessionContext } from "../../session";
import { Colors, Button } from "../Styling";
import { Div } from "../Sections";
import { apply } from "../../actions";

const ApplyModal = ({
  show,
  onClose,
  lang = "es",
  button,
  onLocationChange,
  currentURL,
  myLocations,
}) => {
  const { session, setSession } = useContext(SessionContext);
  const [buttonText, setButtonText] = useState("");
  const [showDiscount, setShowDiscount] = useState(false);
  const [contentBar, setContentBar] = useState({});
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    referral_code: "",
  });
  const [errors, setErrors] = useState({});
  const [showPhoneWarning, setShowPhoneWarning] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [marketingConsent, setMarketingConsent] = useState(false);

  let city = session && session.location ? session.location.city : [];
  let findCity = myLocations?.find((loc) => loc.node?.city === city);

  React.useEffect(() => {
    if (findCity !== undefined && findCity.node) {
      setButtonText(findCity.node.button.apply_button_text);
      setContentBar(findCity?.node.custom_bar);
      if (findCity?.node?.custom_bar?.discounts) setShowDiscount(true);
    }
  }, [findCity]);

  // Agregar efecto para manejar la tecla ESC
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && show) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [show, onClose]);

  // Manejar clic fuera del modal
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name) newErrors.first_name = "El nombre es requerido";
    if (!formData.last_name) newErrors.last_name = "El apellido es requerido";
    if (!formData.email) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido";
    }
    if (!formData.phone) {
      newErrors.phone = "El teléfono es requerido";
    } else if (!/^\+?[\d\s-]{8,}$/.test(formData.phone)) {
      newErrors.phone = "El teléfono no es válido";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        const formPayload = {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone: formData.phone,
          referral_code: formData.referral_code || undefined,
          tag: "website-lead",
          automation: "strong",
          location: session?.location?.city || city,
          course: selectedCourse,
          language: lang,
          utm: session?.utm || {},
          marketing_consent: marketingConsent,
        };

        const response = await apply(formPayload, session);

        if (response) {
          // Actualizar el estado de la sesión si es necesario
          if (session) {
            setSession({
              ...session,
              email: formData.email,
            });
          }

          // Cerrar el modal y mostrar mensaje de éxito
          onClose();
          // Aquí podrías mostrar un mensaje de éxito usando un toast o similar
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        setSubmitError(
          "Hubo un error al enviar el formulario. Por favor, intenta de nuevo."
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      phone: value,
    }));

    // Verificar si el código de país del teléfono coincide con la ubicación seleccionada
    if (selectedLocation && value) {
      const phoneCountryCode = value.match(/^\+\d+/)?.[0];
      if (phoneCountryCode && phoneCountryCode !== selectedLocation.dialCode) {
        setShowPhoneWarning(true);
      } else {
        setShowPhoneWarning(false);
      }
    }
  };

  return (
    <>
      {show && (
        <Overlay onClick={handleOverlayClick}>
          <ModalContainer>
            <ModalHeader>
              <H3 fontSize="22px" fontWeight="600">
                APLICA A 4GEEKS
              </H3>
              <CloseButton onClick={onClose} aria-label="Cerrar modal">
                <Icon icon="close" />
              </CloseButton>
            </ModalHeader>
            <ModalContent>
              <FormSection>
                <H4 fontSize="18px" margin="0 0 20px 0">
                  CUÉNTANOS SOBRE TI
                </H4>
                {submitError && (
                  <ErrorMessage style={{ marginBottom: "20px" }}>
                    {submitError}
                  </ErrorMessage>
                )}
                <Form onSubmit={handleSubmit}>
                  <InputGroup>
                    <Input
                      type="text"
                      name="first_name"
                      placeholder="Nombres"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      error={errors.first_name}
                      disabled={isSubmitting}
                    />
                    {errors.first_name && (
                      <ErrorMessage>{errors.first_name}</ErrorMessage>
                    )}
                  </InputGroup>

                  <InputGroup>
                    <Input
                      type="text"
                      name="last_name"
                      placeholder="Apellidos"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      error={errors.last_name}
                      disabled={isSubmitting}
                    />
                    {errors.last_name && (
                      <ErrorMessage>{errors.last_name}</ErrorMessage>
                    )}
                  </InputGroup>

                  <InputGroup>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={errors.email}
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <ErrorMessage>{errors.email}</ErrorMessage>
                    )}
                  </InputGroup>

                  <InputGroup>
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="Móvil"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      error={errors.phone}
                      disabled={isSubmitting}
                    />
                    {errors.phone && (
                      <ErrorMessage>{errors.phone}</ErrorMessage>
                    )}
                    {showPhoneWarning && (
                      <WarningMessage>
                        ¡Oye! Notamos que tu número de teléfono no es del mismo
                        campus que seleccionó. No hay problema. Solo queríamos
                        avisarte.
                      </WarningMessage>
                    )}
                  </InputGroup>

                  <InputGroup>
                    <Input
                      type="text"
                      name="referral_code"
                      placeholder="Código de invitación (opcional)"
                      value={formData.referral_code}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                    />
                    <HelpText>
                      Si tienes un código, o te ha referido alguien que estudia
                      o ha estudiado en 4Geeks, tendrás un beneficio adicional
                      usando su código de invitación.
                    </HelpText>
                  </InputGroup>

                  <InputGroup>
                    <CheckboxContainer>
                      <Checkbox
                        type="checkbox"
                        id="marketing-consent"
                        checked={marketingConsent}
                        onChange={(e) => setMarketingConsent(e.target.checked)}
                        disabled={isSubmitting}
                      />
                      <CheckboxLabel htmlFor="marketing-consent">
                        {findCity?.node?.consents?.find(
                          (c) => c.slug === "wa_consent"
                        )?.message ||
                          "Acepto recibir información vía email, WhatsApp y/o otros canales sobre talleres de programación, eventos, cursos y otros materiales de marketing. Nunca compartiremos tu información de contacto y puedes darte de baja fácilmente en cualquier momento."}
                      </CheckboxLabel>
                    </CheckboxContainer>
                  </InputGroup>

                  <ButtonContainer>
                    <Button
                      type="submit"
                      variant="full"
                      color={Colors.black}
                      textColor={Colors.white}
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? "Enviando..."
                        : buttonText || button.apply_button_text}
                    </Button>
                  </ButtonContainer>
                </Form>
                <Terms>
                  Al registrarte, estás aceptando nuestros{" "}
                  <a href="/es/terminos">Términos y condiciones</a> y{" "}
                  <a href="/es/privacidad">Políticas de privacidad</a>
                </Terms>
              </FormSection>
            </ModalContent>
          </ModalContainer>
        </Overlay>
      )}
    </>
  );
};

export default ApplyModal;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 101;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ModalContainer = styled.div`
  width: 90%;
  max-width: 500px;
  min-height: 100px;
  background: #fff;
  position: relative;
  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  max-height: 90vh;
  overflow-y: auto;
  cursor: default;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #a9a9a9;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
`;

const ModalContent = styled.div`
  padding: 20px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  width: 30px;
  height: 30px;
  border: none;
  background: none;
  cursor: pointer;
  transition: 0.3s ease all;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &:hover {
    background: #f2f2f2;
  }

  svg {
    width: 13px;
    height: 13px;
  }
`;

const FormSection = styled.div`
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid ${(props) => (props.error ? Colors.red : "#ccc")};
  border-radius: 3px;
  font-size: 16px;
  font-family: "Lato", sans-serif;
  &:focus {
    outline: none;
    border-color: ${(props) => (props.error ? Colors.red : Colors.blue)};
  }
`;

const ErrorMessage = styled.span`
  color: ${Colors.red};
  font-size: 12px;
  font-family: "Lato", sans-serif;
`;

const WarningMessage = styled.div`
  color: ${Colors.orange};
  font-size: 12px;
  font-family: "Lato", sans-serif;
  background: #fff3e0;
  padding: 8px;
  border-radius: 3px;
  margin-top: 5px;
`;

const HelpText = styled.p`
  color: #666;
  font-size: 12px;
  font-family: "Lato", sans-serif;
  margin: 5px 0 0 0;
`;

const Terms = styled.p`
  font-size: 12px;
  color: #3a3a3a;
  font-family: "Lato", sans-serif;
  text-align: center;
  margin-top: 20px;

  a {
    color: ${Colors.blue};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 10px 0;
`;

const Checkbox = styled.input`
  margin-top: 3px;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  font-size: 12px;
  color: #666;
  font-family: "Lato", sans-serif;
  line-height: 1.4;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;
