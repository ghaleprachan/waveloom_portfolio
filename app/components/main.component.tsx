import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./main.module.css";
import { myWorks, techStacks, ourTeam } from "../constants";
import { ShimmerDiv } from "shimmer-effects-react";
import { ClipLoader } from "react-spinners";

interface MainComponentProps {
  aboutMeRef: React.RefObject<HTMLDivElement>;
  ourTeamRef: React.RefObject<HTMLDivElement>;
  techStackRef: React.RefObject<HTMLDivElement>;
  myWorksRef: React.RefObject<HTMLDivElement>;
  contactRef: React.RefObject<HTMLDivElement>;
}

const MainComponent = (props: MainComponentProps) => {
  const { aboutMeRef, ourTeamRef, techStackRef, myWorksRef, contactRef } =
    props;

  const [projects, setProjects] = useState<any[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  useEffect(() => {
    // Fetch projects from your API when the component mounts
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setProjectsLoading(false);
        console.log("Projects from API:", data);
      })
      .catch((err) => {
        setProjectsLoading(false);
        console.error("Error fetching projects:", err);
      });
  }, []);

  

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    setName(data.name as string);
    setEmail(data.email as string);
    setMessage(data.message as string);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("Response from server:", response);

      if (!response.ok) {
        console.error("Network response was not ok:", response.statusText);
        throw new Error("Network response was not ok");
      }

      alert("Message sent successfully!");
      clearForm();
    } catch (error) {
      console.error("Error sending message:", error);
      alert("There was an error sending your message. Please try again later.");
    }
  };
  const clearForm = () => {
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <>
      <div className={styles.container} ref={aboutMeRef}>
        <h3 className={styles.title}>What We Do</h3>
        <p className={styles.subtitle}>
          The company, founded in 2019, worked for years to establish itself in
          the full-stack software development industry, but it wasn't until 2022
          that its breakthrough came. This occurred as they developed their{" "}
          <b>SmartStack</b> architecture - an innovative infrastructure-as-code
          framework that automatically optimizes application deployment based on
          real-time performance analytics and cost metrics
        </p>
        <div className={styles.subtitle}>
          <b>Waveloom</b> is a full-stack software development company that
          specializes in building scalable and efficient web applications. We
          are passionate about creating innovative solutions that solve
          real-world problems.
        </div>
      </div>

      <div className={`${styles.container} ${styles.myWorks}`} ref={ourTeamRef}>
        <h3 className={styles.title}>Our Team</h3>
        <p className={styles.subtitle}>
          We are a team of passionate developers, designers, and project
          managers who are dedicated to delivering high-quality software
          solutions. Our team is made up of individuals with diverse backgrounds
          and skill sets, allowing us to tackle complex challenges and deliver
          exceptional results.
        </p>
        <div className="icons-flex">
          {ourTeam.map((work, index) => (
            <div
              key={work.linkedin || work.name}
              className={styles.workContainer}
            >
              <a
                href={work.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.workImageContainer}
              >
                <Image
                  src={work.image}
                  alt={work.name}
                  className={styles.workImage}
                  width={500}
                  height={350}
                  style={{ height: "350px" }}
                />
              </a>
              <div className={styles.workDetails}>
                <h4 className={styles.workTitle}>
                  <span className={styles.workIndex}>
                    #{index + 1 > 9 ? index + 1 : `0${index + 1}`}{" "}
                  </span>
                  {work.name}
                </h4>
                <div className={styles.workStacks}>
                  <span>{work.role}</span>
                </div>
                <p className={styles.workDescription}>{work.description}</p>
                <a
                  href={work.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkBtn}
                >
                  View on Linkedin
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.container} ref={techStackRef}>
        <h3 className={styles.title}>Our Tech Stacks</h3>
        <p className={styles.subtitle}>
          Mastery is achieved through curiosity and persistence.We thrive on
          exploring new technologies and perfecting the ones we use daily.
        </p>
        <div className="icons-flex">
          {techStacks.map((tech) => (
            <Image
              key={tech.alt}
              src={tech.src}
              alt={tech.alt}
              className={styles.techIcons}
            />
          ))}
        </div>
      </div>

      <div className={`${styles.container} ${styles.myWorks}`} ref={myWorksRef}>
        <h3 className={styles.title}>Some of our works</h3>
        <p className={styles.subtitle}>
          We have worked on a variety of projects, ranging from small web
          applications to large-scale enterprise solutions. Here are some of our
          notable works.
        </p>
        <div className={styles.workList} style={{ width: "100%" }}>
          {!projectsLoading?projects.map((work, index) => (
            <div key={work._id || work.title} className={styles.workContainer}>
              <div className={styles.workImageContainer}>
                <Image
                  src={work.image}
                  alt={work.title}
                  className={styles.workImage}
                  width={1000}
                  height={1000}
                />
              </div>
              <div className={styles.workDetails}>
                <h4 className={styles.workTitle}>
                  <span className={styles.workIndex}>
                    #{index + 1 > 9 ? index + 1 : `0${index + 1}`}{" "}
                  </span>
                  {work.title}
                </h4>
                <div className={styles.workStacks}>
                  {work.techStack?.map((stack: string) => (
                    <span key={stack}>{stack}</span>
                  ))}
                </div>
                <p className={styles.workDescription}>{work.description}</p>
                {/* If you have a link field, you can add a button here */}
              </div>
            </div>
          )):
            <div className="test" style={{display: "flex", width: "100%", justifyContent: "center", alignItems: "center"}}>
            <ClipLoader
              color="#36d7b7"
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            </div>
          }
          {/* {myWorks.map((work, index) => (
            <div key={work.title} className={styles.workContainer}>
              <a
                href={work.websiteLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.workImageContainer}
              >
                <Image
                  src={work.image}
                  alt={work.title}
                  className={styles.workImage}
                  width={1000}
                  height={1000}
                />
              </a>
              <div className={styles.workDetails}>
                <h4 className={styles.workTitle}>
                  <span className={styles.workIndex}>
                    #{index + 1 > 9 ? index + 1 : `0${index + 1}`}{" "}
                  </span>
                  {work.title}
                </h4>
                <div className={styles.workStacks}>
                  {work.stacks.map((stack) => (
                    <span key={stack}>{stack}</span>
                  ))}
                </div>
                <p className={styles.workDescription}>{work.description}</p>
                <a
                  href={work.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkBtn}
                >
                  View on Github
                </a>
              </div>
            </div>
          ))} */}
        </div>
      </div>

      <div className={styles.container} ref={contactRef}>
        <h3 className={styles.title}>Build with us</h3>
        <p className={styles.subtitle}>
          Change your vision into reality. If you have an idea or a project in
          mind, We would love to hear about it. Let’s collaborate and create
          something amazing together!
        </p>
        <form
          className={styles.contactForm}
          onSubmit={handleSubmit}
          method="POST"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={styles.inputField}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.inputField}
          />
          <textarea
            name="message"
            placeholder="Your Idea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className={styles.textareaField}
          ></textarea>
          <button type="submit" className={styles.submitBtn}>
            Send Message
          </button>
        </form>
      </div>
    </>
  );
};

export default MainComponent;
