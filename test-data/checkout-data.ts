export const invalidCheckoutData = [
    {
        testName: 'user cannot checkout without first name',
        firstName: '',
        lastName: 'Pogi',
        zipCode: '143',
        errorMessage: 'First Name is required'
    },
    {
        testName: 'user cannot checkout without last name',
        firstName: 'Kim',
        lastName: '',
        zipCode: '143',
        errorMessage: 'Last Name is required'
    },
    {
        testName: 'user cannot checkout without zip code',
        firstName: 'Kim',
        lastName: 'Pogi',
        zipCode: '',
        errorMessage: 'Postal Code is required'
    }
];