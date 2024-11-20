import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { PlusCircle, X, Upload } from 'lucide-react'

interface ProductService {
  name: string
  description: string
  files: File[]
}

export default function ProductsServicesConfigurationView({ onClose }: { onClose: () => void }) {
  const [companyName, setCompanyName] = useState('')
  const [companyDescription, setCompanyDescription] = useState('')
  const [productsServices, setProductsServices] = useState<ProductService[]>([{ name: '', description: '', files: [] }])
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([])

  const addProductService = () => {
    setProductsServices([...productsServices, { name: '', description: '', files: [] }])
    fileInputRefs.current = [...fileInputRefs.current, null]
  }

  const removeProductService = (index: number) => {
    setProductsServices(productsServices.filter((_, i) => i !== index))
    fileInputRefs.current = fileInputRefs.current.filter((_, i) => i !== index)
  }

  const updateProductService = (index: number, field: keyof ProductService, value: string | File[]) => {
    const updatedProductsServices = [...productsServices]
    updatedProductsServices[index][field] = value as never
    setProductsServices(updatedProductsServices)
  }

  const handleFileChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      updateProductService(index, 'files', Array.from(files))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend or perform further actions
    console.log({ companyName, companyDescription, productsServices })
    alert('Configuration saved successfully!')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center overflow-y-auto">
      <Card className="w-full max-w-4xl mx-4 my-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Products and Services Configuration</CardTitle>
            <CardDescription>Configure your company, products, and services information for better sales targeting.</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyDescription">Company Description</Label>
              <Textarea
                id="companyDescription"
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
                required
              />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Products and Services</Label>
                <Button type="button" variant="outline" size="sm" onClick={addProductService}>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Product/Service
                </Button>
              </div>
              {productsServices.map((item, index) => (
                <Card key={index}>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <Label>Product/Service {index + 1}</Label>
                      {index > 0 && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeProductService(index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`itemName${index}`}>Name</Label>
                      <Input
                        id={`itemName${index}`}
                        value={item.name}
                        onChange={(e) => updateProductService(index, 'name', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`itemDescription${index}`}>Description</Label>
                      <Textarea
                        id={`itemDescription${index}`}
                        value={item.description}
                        onChange={(e) => updateProductService(index, 'description', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`itemFiles${index}`}>Additional Files</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id={`itemFiles${index}`}
                          type="file"
                          multiple
                          className="hidden"
                          onChange={(e) => handleFileChange(index, e)}
                          ref={el => fileInputRefs.current[index] = el}
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => fileInputRefs.current[index]?.click()}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Files
                        </Button>
                        <span className="text-sm text-gray-500">
                          {item.files.length} file(s) selected
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Save Configuration</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
