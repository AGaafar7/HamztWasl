import Hero from '../components/Hero.jsx'
import Stats from '../components/Stats.jsx'
import Courses from '../components/Courses.jsx'
import LearningPath from '../components/LearningPath.jsx'
import Testimonials from '../components/Testimonials.jsx'
import CTA from '../components/CTA.jsx'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Courses />
      <LearningPath />
      <Testimonials />
      <CTA />
    </>
  )
}
