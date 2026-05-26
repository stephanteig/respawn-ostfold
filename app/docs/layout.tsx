import { Layout, Navbar } from 'nextra-theme-docs'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import '../globals.css'

export const metadata = {
  title: 'Respawn Østfold Docs',
  description: 'Dokumentasjon for Respawn Østfold — MCSR Ranked stream-produksjon, overlays og kontrollpanel.',
}

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export default async function DocsLayout({ children }: { children: React.ReactNode }) {
  const pageMap = await getPageMap('/docs')

  const navbar = (
    <Navbar
      logo={
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src={`${BASE}/logo-1.png`}
            alt="Respawn Østfold logo"
            width={28}
            height={28}
            style={{ imageRendering: 'pixelated', width: 28, height: 28 }}
          />
          <span style={{
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: '13px',
            letterSpacing: '2px',
            color: '#FFFFFF',
          }}>
            RESPAWN <span style={{ color: '#87CE34' }}>ØSTFOLD</span>
          </span>
        </div>
      }
      projectLink="https://github.com/stephanteig/respawn-ostfold"
    />
  )

  return (
    <Layout
      navbar={navbar}
      pageMap={pageMap}
      docsRepositoryBase="https://github.com/stephanteig/respawn-ostfold/tree/main/content"
      footer={
        <div style={{
          fontFamily: 'Share Tech Mono, monospace',
          fontSize: '11px',
          letterSpacing: '2px',
          color: 'rgba(122,172,174,0.5)',
          textAlign: 'center',
          padding: '16px',
        }}>
          GLEMMEN VGS · FREDRIKSTAD · MCSR RANKED · CASH PRIZE TOURNAMENT
        </div>
      }
      sidebar={{ defaultMenuCollapseLevel: 1 }}
      editLink="Rediger denne siden på GitHub"
    >
      {children}
    </Layout>
  )
}
