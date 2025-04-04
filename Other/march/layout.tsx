import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Settings, Search, Database, Users, Menu } from 'lucide-react'
import ProductsServicesConfigurationView from '@/components/configuration-view'
import ResearchView from '@/components/research-view'
import DataEnrichmentView from '@/components/data-enrichment-view'
import PeopleEnrichmentView from '@/components/people-enrichment-view'
import { 
  Sidebar, 
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar"

type ViewType = 'research' | 'dataEnrichment' | 'peopleEnrichment' | 'configuration'

export default function AppLayout() {
  const [showConfig, setShowConfig] = useState(false)
  const [activeView, setActiveView] = useState<ViewType>('research')

  const viewComponents: Record<ViewType, JSX.Element> = {
    research: <ResearchView />,
    dataEnrichment: <DataEnrichmentView />,
    peopleEnrichment: <PeopleEnrichmentView />,
    configuration: <ProductsServicesConfigurationView onClose={() => setActiveView('research')} />
  }

  const menuItems = [
    { id: 'research', icon: Search, label: 'Research' },
    { id: 'dataEnrichment', icon: Database, label: 'Data Enrichment' },
    { id: 'peopleEnrichment', icon: Users, label: 'People Enrichment' },
    { id: 'configuration', icon: Settings, label: 'Configuration' }
  ]

  return (
    <SidebarProvider>
      <div className="min-h-screen flex">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center p-4">
              <img src="/placeholder.svg?height=40&width=40" alt={'Logo'} className="h-8 w-8 mr-2" />
              <span className="text-lg font-bold">{'Sales Targeting'}</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => setActiveView(item.id as ViewType)}
                    isActive={activeView === item.id}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 flex flex-col">
          <header className="bg-background border-b">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <SidebarTrigger className="md:hidden">
                <Menu className="h-6 w-6" />
              </SidebarTrigger>
              <div className="md:hidden">
                <span className="text-xl font-bold">{'Sales Targeting App'}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setActiveView('configuration')}>
                <Settings className="h-5 w-5" />
                <span className="sr-only">{'Settings'}</span>
              </Button>
            </div>
          </header>
          <main className="flex-grow container mx-auto px-4 py-8">
            {viewComponents[activeView]}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
