import { college } from '../data/college'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6 text-xs leading-relaxed text-muted sm:px-6">
        <p>
          Campus Navigator is an independent student project, not an official college service.
          Records and floor-plan areas marked “Sample” are illustrative only.
        </p>
        <p className="mt-1">
          Reference: {college.name}, {college.location}. Official website:{' '}
          <a
            href={college.website}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-ink underline decoration-primary decoration-2 underline-offset-2"
          >
            {college.websiteLabel}
          </a>
        </p>
      </div>
    </footer>
  )
}