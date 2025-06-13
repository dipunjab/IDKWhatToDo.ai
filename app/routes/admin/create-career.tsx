import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import type { Route } from './+types/create-career'
import React, { useState } from "react";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { account } from "~/appwrite/client";
import { useNavigate } from "react-router";
import Header from "components/Headers";
import { comboBoxItems, selectItems } from "~/constant";
import { cn, formatKey } from "lib/utlis";
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';

export const loader = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,latlng,flags,maps');
    const data = await response.json();

    return data.map((c: any) => ({
        name: c.name.common,
        value: c.name.common,
        flag: c.flags?.png
    })) as Country[];
}

const CreateCareer = ({ loaderData }: Route.ComponentProps) => {
    const countries = loaderData as Country[];
    const navigate = useNavigate();

    const [formData, setFormData] = useState<CareerFormData>({
        age: 0,
        country: countries[0]?.name || '',
        education: '',
        interests: [],
        personality: '',
        skills: [],
        experienceLevel: '',
        descriptionByUser: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true);

        console.log("Submitted form data:", formData);


        if (
            !formData.age ||
            !formData.country ||
            !formData.education ||
            formData.interests.length === 0 ||
            !formData.personality ||
            formData.skills.length === 0 ||
            !formData.experienceLevel ||
            formData.descriptionByUser.length === 0
        ) {
            setError('Please provide values for all fields');
            setLoading(false)
            return;
        }

        if (formData.age < 5 || formData.age > 100) {
            setError('Age must be between 5 and 100 days');
            setLoading(false)
            return;
        }

        const user = await account.get();
        if (!user.$id) {
            console.error('User not authenticated');
            setLoading(false)
            return;
        }

        try {
            const response = await fetch(`/api/create-career`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    country: formData.country,
                    age: formData.age,
                    interests: formData.interests,
                    skills: formData.skills,
                    personality: formData.personality,
                    experienceLevel: formData.experienceLevel,
                    education: formData.education,
                    descriptionByUser: formData.descriptionByUser,
                    userId: user.$id
                })
            })

            const result: CreateCareerResponse = await response.json();

            console.log(result);

            if (result?.id) navigate(`/careers/${result.id}`)
            else console.error('Failed to generate a trip')

        } catch (error) {
            console.log("Error While generating career: ", error);

        }

    };

    const handleChange = (key: keyof CareerFormData, value: string | number) => {
        setFormData({ ...formData, [key]: value })
    }

    const countryData = countries.map((country) => ({
        text: country.name,
        value: country.value,
        flag: country.flag
    }))



    return (
        <main className="flex flex-col gap-10 pb-20 wrapper">
            <Header title="Add a New Career" description="View and edit AI Generated Career plans" />

            <section className="mt-2.5 wrapper-md">
                <form className="career-form" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="country">
                            Country
                        </label>
                        <ComboBoxComponent
                            id="country"
                            dataSource={countryData}
                            fields={{ text: 'text', value: 'value' }}
                            placeholder="Select a Country"
                            className="combo-box"
                            change={(e: { value: string | undefined }) => {
                                if (e.value) {
                                    handleChange('country', e.value)
                                }
                            }}
                            allowFiltering
                            filtering={(e) => {
                                const query = e.text.toLowerCase();

                                e.updateData(
                                    countries.filter((country) => country.name.toLowerCase().includes(query)).map(((country) => ({
                                        text: country.name,
                                        value: country.value,
                                        flag: country.flag
                                    })))
                                )
                            }}
                            itemTemplate={(data: any) => (
                                <div className="flex items-center gap-2">
                                    <img src={data.flag} alt={data.text} className="w-6 h-4 object-cover rounded-sm" />
                                    <span>{data.text}</span>
                                </div>
                            )}
                        />
                    </div>

                    <div>
                        <label htmlFor="age">Age</label>
                        <input
                            id="age"
                            name="age"
                            type="number"
                            value={formData.age}
                            placeholder="Enter Your Age"
                            className="form-input placeholder:text-gray-100"
                            onChange={(e) => handleChange('age', Number(e.target.value))}
                        />
                    </div>

                    {selectItems.map((key) => {
                        const isMultiSelect = key === 'skills' || key === 'interests';

                        return (
                            <div key={key}>
                                <label htmlFor={key}>{formatKey(key)}</label>

                                {isMultiSelect ? (
                                    <>
                                        <MultiSelectComponent
                                            id={key}
                                            dataSource={comboBoxItems[key].map((item) => ({
                                                text: item,
                                                value: item,
                                            }))}
                                            fields={{ text: 'text', value: 'value' }}
                                            value={formData[key]}
                                            placeholder={`Select ${formatKey(key)}`}
                                            mode="Box"
                                            change={(e) => {
                                                handleChange(key, e.value || []);
                                            }}
                                            allowCustomValue={true}
                                            allowFiltering
                                            filtering={(e) => {
                                                const query = e.text.toLowerCase();
                                                e.updateData(
                                                    comboBoxItems[key]
                                                        .filter((item) => item.toLowerCase().includes(query))
                                                        .map((item) => ({
                                                            text: item,
                                                            value: item,
                                                        }))
                                                );
                                            }}
                                            className="combo-box"
                                        />
                                        <p className="text-xs text-blue-800 mb-1">You can also type and add your own {key}.</p>
                                    </>
                                ) : (
                                    <ComboBoxComponent
                                        id={key}
                                        dataSource={comboBoxItems[key].map((item) => ({
                                            text: item,
                                            value: item,
                                        }))}
                                        fields={{ text: 'text', value: 'value' }}
                                        placeholder={`Select ${formatKey(key)}`}
                                        change={(e: { value: string | undefined }) => {
                                            if (e.value) {
                                                handleChange(key, e.value);
                                            }
                                        }}
                                        allowFiltering
                                        filtering={(e) => {
                                            const query = e.text.toLowerCase();
                                            e.updateData(
                                                comboBoxItems[key]
                                                    .filter((item) => item.toLowerCase().includes(query))
                                                    .map((item) => ({
                                                        text: item,
                                                        value: item,
                                                    }))
                                            );
                                        }}
                                        className="combo-box"
                                    />
                                )}
                            </div>
                        );
                    })}



                    <div>
                        <label htmlFor="descriptionByUser">Describe Yourself</label>
                        <textarea
                            id="descriptionByUser"
                            name="descriptionByUser"
                            placeholder="In Your Own Words...."
                            className="form-input placeholder:text-gray-100"
                            rows={6}
                            onChange={(e) => handleChange("descriptionByUser", e.target.value)}

                        />
                    </div>
                    <div className="bg-gray-200 h-px w-full" />

                    {error && (
                        <div className="error">
                            <p>{error}</p>
                        </div>
                    )}
                    <footer className="px-6 w-full">
                        <ButtonComponent type="submit"
                            className="button-class !h-12 !w-full" disabled={loading}
                        >
                            <img src={`/icons/${loading ? 'loader.svg' : 'ai.svg'}`} className={cn("size-5", { 'animate-spin': loading })} />
                            <span className="p-16-semibold text-white">
                                {loading ? 'Generating...' : 'Generate Career'}
                            </span>
                        </ButtonComponent>
                    </footer>
                </form>
            </section>
        </main>
    )
}
export default CreateCareer